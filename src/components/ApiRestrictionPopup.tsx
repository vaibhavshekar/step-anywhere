import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ApiRestrictionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiRestrictionPopup = ({ isOpen, onClose }: ApiRestrictionPopupProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">API Limitations Notice</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 mt-4">
            <p className="text-base">
              Some features in this deployed production version may have limited functionality due to API restrictions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>News articles may be limited or unavailable</li>
              <li>Safety ratings may not be fully accurate</li>
            </ul>
            <p className="text-base">
              For a complete demonstration of all features, please refer to the{' '}
              <a 
                href="https://drive.google.com/file/d/1uJE879Rvl2VQPaWLMKkSRDB5iOr4a8RM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple hover:text-brand-purple-dark underline font-medium"
              >
                screen recording
              </a>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogAction 
            onClick={onClose}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
          >
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApiRestrictionPopup; 