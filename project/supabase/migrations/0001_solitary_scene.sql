/*
  # Create messages table for Note to Self

  1. New Tables
    - `scheduled_messages`
      - `id` (uuid, primary key)
      - `message` (text, the note content)
      - `email` (text, recipient email - encrypted)
      - `scheduled_date` (timestamptz, when to send)
      - `sent` (boolean, tracking if message was sent)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on `scheduled_messages` table
    - Add policy for inserting new messages
    - Add policy for system to read messages for sending
*/

CREATE TABLE scheduled_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  email text NOT NULL,
  scheduled_date timestamptz NOT NULL,
  sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scheduled_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert new messages
CREATE POLICY "Anyone can create new messages"
  ON scheduled_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only system can read messages for sending
CREATE POLICY "System can read messages"
  ON scheduled_messages
  FOR SELECT
  TO service_role
  USING (true);