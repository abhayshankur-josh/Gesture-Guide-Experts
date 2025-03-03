interface IProfile {
    id: number;
    email: string;
    full_name: string;
    role_id: number;
    jti: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}


// Props for the ProfileModal component
interface IProfileModalProps {
    show: boolean;
    onHide: () => void;
  }
  