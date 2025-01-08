"use client";

import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import DashboardTitle from "@/components/DashboardTitle";
import { Input } from "@nextui-org/react";
import { apiPost, apiGet } from "@/utils/apiRequester"; 


export default function Skills() {
  const styles = {
    inputWrapper: [
      "border-primary",
      "data-[hover=true]:border-primary-100",
      "group-data-[focus=true]:border-primary",
    ],
    clearButton: "text-primary",
  };

  const [skills, setSkills] = useState<FormData[]>([]);
  const [formData, setFormData] = useState({
    competence: "",
    logo: "",
  });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  interface FormData {
    competence: string;
    logo: string;
  }

  const saveSkills = async (skills: FormData[]) => {
    try {
      const response = await apiPost("skills", { skills }, "application/json");
      if (response.status === 201) {
        console.log("Compétences enregistrées avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des compétences :", error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevFormData: FormData) => ({ ...prevFormData, [name]: file.name }));
    } else {
      setFormData((prevFormData: FormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formData.competence || !formData.logo) {
      alert("Tous les champs doivent être remplis");
      return;
    }
    const updatedSkills = [...skills, formData];
    setSkills(updatedSkills);
    setFormData({ competence: "", logo: "" });
    setImagePreview(null);
    await saveSkills(updatedSkills);
  };

  const handleDelete = (index: number): void => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiGet("skills");
        if (response.status === 200) {
          setSkills(response.data.skills);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des compétences :", error);
      }
    };
  
    fetchSkills();
  }, []);

  return (
    <>
      <DashboardTitle title="Mes compétences" />
      <div className="flex-1 p-6">
        <div className="mt-1 w-full">
          <div className="grid grid-cols-3 mt-10 gap-5">
            {skills.map((skill, index) => (
              <div
                key={index}
                className=" flex items-center justify-between rounded-xl p-5 border-2 border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-full h-[fit-content]"
              >
                <div className="flex-shrink-0">
                  <div className="">{skill.logo}</div>
                </div>
                <div className="flex-grow ml-4">
                  <h3 className="text-xl ">{skill.competence}</h3>
                </div>
                <div className="cursor-pointer" onClick={() => handleDelete(index)}>
                  <RxCross2 size={40}  />
                </div>
              </div>
            ))}
            <div className=" flex flex-col justify-between rounded-xl p-5 border-2 border-[#2C2D33] bg-[#f5f5f5] dark:bg-[#191919] w-full h-[fit-content]">
              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 items-center justify-center">
                <Input
                  type="text"
                  name="competence"
                  value={formData.competence}
                  label="Compétence"
                  variant="bordered"
                  onChange={handleChange}
                  placeholder="Exemple: Développement web"
                  classNames={styles}
                />

                <Input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  variant="bordered"
                  label="Format png,jpg, autre ..."
                  placeholder=" Ajouter un logo"
                  classNames={styles}
                />
                {imagePreview && <img src={imagePreview as string} alt="Logo Preview" className="mt-4" />}
                <div className="flex justify-center w-full">
                  <button type="submit" className="color-white text-sm rounded-md mt-6 hover:color-gray">
                    <div className="flex justify-center">
                      <div className="fit-content ">
                        <CiSquarePlus size={40} color="#FFFFFF" />
                      </div>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}