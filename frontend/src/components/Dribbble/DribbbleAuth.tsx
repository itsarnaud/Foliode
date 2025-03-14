'use client';

import Buttons            from '@/components/UI/button';
import { signInDribbble } from '@/actions';
import { FaDribbble }     from 'react-icons/fa';

export default function SignIn() {
  return (
    <form action={signInDribbble} className="w-full">
      <Buttons 
        text="Dribbble"
        style="form"
        icon={<FaDribbble />}
        type="submit"
      />
    </form>
  );
}