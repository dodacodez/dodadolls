// Shape of the normalized dollmatch data (src/dollmatch/data.json).
export type Doll = {
  id: number;
  mattel_id: string;
  name: string;
  year: string | null;
  image_url: string | null;
  body_type: string | null;
  is_mtm: boolean;
  mtm_variant?: "classic";
  skintone: {
    name: string | null;
    color: string | null;
    description: string | null;
  };
  facesculpt: string | null;
  line: string | null;
};
