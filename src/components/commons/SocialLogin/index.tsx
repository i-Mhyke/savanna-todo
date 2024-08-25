import Button from "@/components/ui/buttons/Button";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export const SocialLogin = () => {
  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        variant="light"
        leftIcon={FcGoogle}
        leftIconClassName="text-3xl mr-2"
      >
        Sign in with Google
      </Button>
      <Button
        className="w-full"
        variant="light"
        leftIcon={BsFacebook}
        leftIconClassName="fill-[#1a77f2] text-3xl mr-2"
      >
        Sign in with Facebook
      </Button>
    </div>
  );
};
