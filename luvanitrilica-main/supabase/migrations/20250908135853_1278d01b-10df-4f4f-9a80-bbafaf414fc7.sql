-- Fix critical RLS policy gaps for profiles table

-- 1. Add INSERT policy for profiles table (allow users to create their own profile)
CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 2. Drop existing UPDATE policy and create a more restrictive one
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- 3. Create new UPDATE policy that prevents role changes by regular users
CREATE POLICY "Users can update their own profile (except role)" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (
  auth.uid() = user_id AND 
  -- Only allow role changes for admin users
  (OLD.role = NEW.role OR get_current_user_role() = 'admin')
);

-- 4. Add policy for admins to manage all profiles
CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (get_current_user_role() = 'admin') 
WITH CHECK (get_current_user_role() = 'admin');

-- 5. Ensure the trigger exists for auto-creating profiles (recreate if needed)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Add basic rate limiting structure for contact form
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

-- Function to check and update rate limits
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(client_ip INET)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
  last_reset TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Clean up old entries (older than 1 hour)
  DELETE FROM public.contact_rate_limits 
  WHERE last_submission < (now() - INTERVAL '1 hour');
  
  -- Check current rate for this IP
  SELECT submission_count, last_submission 
  INTO current_count, last_reset
  FROM public.contact_rate_limits 
  WHERE ip_address = client_ip;
  
  -- If no record exists, create one
  IF current_count IS NULL THEN
    INSERT INTO public.contact_rate_limits (ip_address, submission_count, last_submission)
    VALUES (client_ip, 1, now());
    RETURN true;
  END IF;
  
  -- If within 1 hour and already 3+ submissions, deny
  IF current_count >= 3 AND last_reset > (now() - INTERVAL '1 hour') THEN
    RETURN false;
  END IF;
  
  -- If more than 1 hour passed, reset counter
  IF last_reset <= (now() - INTERVAL '1 hour') THEN
    UPDATE public.contact_rate_limits 
    SET submission_count = 1, last_submission = now()
    WHERE ip_address = client_ip;
    RETURN true;
  END IF;
  
  -- Increment counter
  UPDATE public.contact_rate_limits 
  SET submission_count = submission_count + 1, last_submission = now()
  WHERE ip_address = client_ip;
  
  RETURN true;
END;
$$;