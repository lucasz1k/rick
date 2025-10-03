-- Fix critical RLS policy gaps for profiles table (corrected version)

-- 1. Add INSERT policy for profiles table (allow users to create their own profile)
CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 2. Drop existing UPDATE policy and create a more restrictive one
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- 3. Create new UPDATE policy that allows users to update their profile but restricts role changes
CREATE POLICY "Users can update their own profile (non-role fields)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 4. Create separate policy for role updates (admin only)
CREATE POLICY "Admins can update any profile role" 
ON public.profiles 
FOR UPDATE 
USING (get_current_user_role() = 'admin') 
WITH CHECK (get_current_user_role() = 'admin');

-- 5. Add policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- 6. Ensure the trigger exists for auto-creating profiles (recreate if needed)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Add basic rate limiting structure for contact form
CREATE TABLE IF NOT EXISTS public.contact_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL,
  submission_count INTEGER NOT NULL DEFAULT 1,
  last_submission TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on rate limiting table
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to check/update rate limits (needed for public contact form)
CREATE POLICY "Public access for rate limiting" 
ON public.contact_rate_limits 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for efficient IP lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_ip_time 
ON public.contact_rate_limits (ip_address, last_submission);