import { Dialog, DialogContent } from "./ui/dialog";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { UserDetails } from "./UserDetails";

export const UserModal = ({ isOpen, onClose, mode, selectedUser }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none sm:max-w-[480px]">
        
        {mode === "add" && (
          <AddUser onClose={onClose} onSuccess={onClose} />
        )}
        
        {mode === "edit" && (
          <EditUser user={selectedUser} onClose={onClose} onSuccess={onClose} />
        )}

        {mode === "view" && (
          <UserDetails user={selectedUser} onClose={onClose} />
        )}

      </DialogContent>
    </Dialog>
  );
};