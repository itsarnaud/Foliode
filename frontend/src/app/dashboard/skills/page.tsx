"use client";

import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import DashboardTitle from "@/components/DashboardTitle";
import { Input } from "@nextui-org/react";
import { apiPost, apiGetWithAuth, apiDelete } from "@/utils/apiRequester";
import { Image } from "@nextui-org/react";
import { formatImage } from "@/utils/formatImage";
import { Tools } from "@/interfaces/Tools";
import FileInput from "@/components/UI/FileInput";
import Buttons from "@/components/UI/button";
import { formatToolsData } from "@/utils/formatData";

interface Skill {
  id: string;
  picto: string;
  name: string;
}

export default function SkillsPage() {
  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary",
    ],
    clearButton: "text-primary",
  };

  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState<Tools>({ name: "", image: null });

  useEffect(() => {
    fetchSkills();
  }, []);
  
  const fetchSkills = async () => {
    try {
      const response = await apiGetWithAuth("portfolio");
      if (response.status === 200) {
        setSkills(response.data.tools);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des compétences :", error);
    }
  };

  const creatSkills = async () => {
    if (!formData.image || !formData.name) {
      alert("Tous les champs doivent être remplis");
      return;
    }
    const tools = formatToolsData([formData]);
    await apiPost("portfolio/tools", tools, "multipart/form-data");
    await fetchSkills();
  };

  const handleDelete = async (id: string) => {
    await apiDelete(`portfolio/tool/${id}`);
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <>
      <DashboardTitle title="Mes compétences" />
      <div className="flex-1 p-6">
        <div className="mt-1 w-full">
          <div className="grid grid-cols-3 mt-10 gap-5">
            {skills &&
              skills.length !== 0 &&
              skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl p-5 border-2 border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-full h-[fit-content]"
                >
                  <div className="flex-shrink-0">
                    <Image
                      width={40}
                      height={40}
                      src={formatImage(skill.picto)}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    <h3 className="text-xl ">{skill.name}</h3>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(skill.id)}
                  >
                    <RxCross2 size={40} />
                  </div>
                </div>
              ))}
            <div className="flex flex-col justify-between rounded-xl p-5 border-2 border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-full h-[fit-content]">
              <div
                className={`bg-[#f5f5f5] dark:bg-[#191919] rounded-md p-5 space-y-2 flex flex-col transition-all duration-300 ease-in-out relative w-full `}
              >
                <Input
                  type="text"
                  name="competence"
                  value={formData.name}
                  label="Compétence"
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Exemple: Développement web"
                  classNames={styles}
                />
                <FileInput
                  onChange={(files) =>
                    setFormData({ ...formData, image: files[0] })
                  }
                  files={formData.image ? [formData.image] : []}
                />
                <Buttons
                  text="Ajouter un Skills"
                  style="form"
                  className="bg-primary w-auto"
                  onClick={creatSkills}
                />
              </div>

              <div className="flex justify-center w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
