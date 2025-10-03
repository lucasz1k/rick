-- Fix Critical Privilege Escalation Vulnerability
-- Prevent users from updating their own role
DROP POLICY IF EXISTS "profiles_user_own_update" ON public.profiles;

CREATE POLICY "profiles_user_own_update"
ON public.profiles
FOR UPDATE
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND auth.uid() = user_id
  -- Prevent role changes: verify role hasn't been modified
  AND role = (SELECT role FROM public.profiles WHERE user_id = auth.uid())
);

-- Add Input Validation Constraints
-- Contacts table validation
ALTER TABLE public.contacts
ADD CONSTRAINT contacts_name_length CHECK (char_length(name) <= 100 AND char_length(name) >= 2),
ADD CONSTRAINT contacts_email_length CHECK (char_length(email) <= 255 AND char_length(email) >= 5),
ADD CONSTRAINT contacts_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT contacts_phone_length CHECK (char_length(phone) <= 20 AND char_length(phone) >= 8),
ADD CONSTRAINT contacts_message_length CHECK (char_length(message) <= 2000 AND char_length(message) >= 10);

-- Profiles table validation
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_display_name_length CHECK (display_name IS NULL OR (char_length(display_name) <= 100 AND char_length(display_name) >= 2));