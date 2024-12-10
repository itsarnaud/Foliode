import { div } from "framer-motion/client";
import { Spinner } from '@nextui-org/react';




export default function Loader() {

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner size="lg" color="secondary" labelColor="secondary" />
            </div>

        </div>

    );
}