import styles       from "./page.module.css";
import GithubAuth   from "../components/GitHub/GithubAuth";
import DribbbleAuth from "@/components/Dribbble/DribbbleAuth";
import SignOut      from "../components/SignOut";
import Avatar from '../components/profile_picture/Avatar';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function Home() {
  return (
    <div className={styles.page}>
      <Card className="max-w-[400px] nightMode bg-background ">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p color="primary" className="text-16 lg:text-16">NextUI</p>
            <p className="text-16 lg:text-16">nextui.org</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody className="text-16 lg:text-16">
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Divider/>
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
        <Avatar email="utilisateur@exemple.com" size={50} />
      </Card>
    
      <GithubAuth />
      <DribbbleAuth />
      <SignOut />
    </div>
  );
}
