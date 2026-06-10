-- Create program_invites table
CREATE TABLE IF NOT EXISTS program_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL,
  token text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  used_at timestamptz,
  used_by uuid,
  CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_program_invites_program_id ON program_invites(program_id);
CREATE INDEX IF NOT EXISTS idx_program_invites_token ON program_invites(token);
