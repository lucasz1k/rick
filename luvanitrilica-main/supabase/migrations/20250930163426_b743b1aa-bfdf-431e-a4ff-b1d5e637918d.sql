-- Fix critical rate limiting function with proper permissions
CREATE OR REPLACE FUNCTION public.check_and_update_rate_limit(client_ip inet)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
  v_last_submission timestamptz;
  v_time_window interval := interval '1 hour';
  v_max_submissions integer := 5;
BEGIN
  -- Get current submission count and last submission time
  SELECT submission_count, last_submission
  INTO v_count, v_last_submission
  FROM contact_rate_limits
  WHERE ip_address = client_ip;

  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO contact_rate_limits (ip_address, submission_count, last_submission)
    VALUES (client_ip, 1, now());
    RETURN true;
  END IF;

  -- Check if we're still within the time window
  IF (now() - v_last_submission) < v_time_window THEN
    -- Check if limit exceeded
    IF v_count >= v_max_submissions THEN
      RETURN false;
    END IF;
    
    -- Increment count
    UPDATE contact_rate_limits
    SET submission_count = submission_count + 1,
        last_submission = now()
    WHERE ip_address = client_ip;
    RETURN true;
  ELSE
    -- Time window expired, reset count
    UPDATE contact_rate_limits
    SET submission_count = 1,
        last_submission = now()
    WHERE ip_address = client_ip;
    RETURN true;
  END IF;
END;
$$;

-- Grant execute permission to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.check_and_update_rate_limit(inet) TO anon;
GRANT EXECUTE ON FUNCTION public.check_and_update_rate_limit(inet) TO authenticated;

-- Enable realtime for contacts table
ALTER TABLE public.contacts REPLICA IDENTITY FULL;

-- Add contacts table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.contacts;