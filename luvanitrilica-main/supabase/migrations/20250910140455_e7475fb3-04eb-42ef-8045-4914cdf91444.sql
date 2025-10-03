-- Fix critical RLS vulnerability in contact_rate_limits table
-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Public access for rate limiting" ON public.contact_rate_limits;

-- Create secure rate limiting function that handles all rate limit logic
CREATE OR REPLACE FUNCTION public.check_and_update_rate_limit(
  request_ip inet,
  max_submissions integer DEFAULT 5,
  time_window_minutes integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
  time_threshold timestamp with time zone;
BEGIN
  time_threshold := now() - (time_window_minutes || ' minutes')::interval;
  
  -- Get current submission count within time window
  SELECT COALESCE(submission_count, 0) INTO current_count
  FROM contact_rate_limits 
  WHERE ip_address = request_ip 
  AND last_submission > time_threshold;
  
  -- If no recent submissions or under limit, allow and update
  IF current_count IS NULL OR current_count < max_submissions THEN
    -- Insert or update rate limit record
    INSERT INTO contact_rate_limits (ip_address, submission_count, last_submission)
    VALUES (request_ip, 1, now())
    ON CONFLICT (ip_address) DO UPDATE SET
      submission_count = CASE 
        WHEN contact_rate_limits.last_submission > time_threshold 
        THEN contact_rate_limits.submission_count + 1
        ELSE 1
      END,
      last_submission = now();
    
    RETURN true;
  ELSE
    RETURN false;
  END IF;
END;
$$;

-- Create restrictive RLS policies for contact_rate_limits
-- Only allow the rate limiting function to access the table
CREATE POLICY "Rate limiting function access only" 
ON public.contact_rate_limits 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Create cleanup function for old rate limit records (optional, for maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM contact_rate_limits 
  WHERE last_submission < now() - interval '24 hours';
END;
$$;

-- Update contacts table policies to include rate limiting check
DROP POLICY IF EXISTS "Anyone can create contacts" ON public.contacts;

CREATE POLICY "Rate limited contact creation" 
ON public.contacts 
FOR INSERT 
WITH CHECK (
  -- Allow inserts only if rate limit check passes
  public.check_and_update_rate_limit(inet_client_addr())
);