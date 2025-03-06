interface IProfile {
    id: number;
    email: string;
    username: string;
    role: string;
    // jti: string;
    // active: boolean;
    // created_at: string;
    // updated_at: string;
}


// Props for the ProfileModal component
interface IProfileModalProps {
    show: boolean;
    onHide: () => void;
  }
  