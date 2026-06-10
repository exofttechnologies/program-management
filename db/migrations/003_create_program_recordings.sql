-- Create program_recordings table
CREATE TABLE IF NOT EXISTS program_recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL,
  name text NOT NULL,
  url text,
  day_number integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT fk_recording_program FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_program_recordings_program_id ON program_recordings(program_id);
