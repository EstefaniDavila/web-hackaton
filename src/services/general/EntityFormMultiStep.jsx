import React, { lazy, Suspense } from "react"; 
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { SheetMultiStep, SheetMultiStepContent, SheetMultiStepHeader, SheetMultiStepFooter, SheetMultiStepTitle, SheetMultiStepDescription } from "@/components/custom/SheetMultiStep";
import { Button } from "@/components/custom/button";
import { TbTrash } from "react-icons/tb";
import {
  handleNext,
  handlePrev,
  handleChange,
  handleSelectChange,
  handleFileChange,
  handleRemoveProfessor,
} from "@/services/general/handlers";
// import SearchableSelect from "./SearchableSelect";
// import ProfessorList from "../programs/ProfessorList";

const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';



const EntityFormMultiStep = ({ isOpen, onOpenChange, initialData, onSave, onChange, steps, options, images = {}, mutate }) => {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState({ ...initialData });


  const currentStep = steps[step];
  const isUpdating = formData.id !== undefined;

  const handleQuillChange = (fieldId, value) => {
    setFormData((prevData) => ({ ...prevData, [fieldId]: value }));
    onChange(fieldId, value);
  };

  return (
    <SheetMultiStep open={isOpen} onOpenChange={onOpenChange}>
      <SheetMultiStepContent side="right">
        <SheetMultiStepHeader>
          <SheetMultiStepTitle>{currentStep.title}</SheetMultiStepTitle>
          <SheetMultiStepDescription>{currentStep.description}</SheetMultiStepDescription>
        </SheetMultiStepHeader>
        <div className="space-y-7">
          {currentStep.fields.map((field) => {
            if (field.id === 'short_name') {
              return (
                <div key={field.id} className="flex mb-3 space-x-4">
                  <label className="block w-full font-bold">
                    {field.label}
                    <Input
                      type={field.type}
                      name={field.id}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(e, setFormData, onChange)}
                      className="w-full p-2 mt-1 border rounded font-normal"
                    />
                  </label>
                </div>
              );
            }
            if (field.type === "textarea") {
              return (
                <label key={field.id} className="block mb-4 font-bold">
                  {field.label}
                  <Suspense fallback={<div>Loading...</div>}>
                    <ReactQuill
                      theme="snow"
                      value={formData[field.id] || ""}
                      onChange={(value) => handleQuillChange(field.id, value)}
                      modules={{
                        toolbar: [
                          [{ header: '1' }, { header: '2' }, { font: [] }],
                          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                          ['bold', 'italic', 'underline'],
                          ['image', 'link'],
                          ['clean'],
                        ],
                      }}
                      className="w-full p-2 mt-1 border rounded font-normal"
                    />
                  </Suspense>
                </label>
              );
            }
            
            if (field.type === "select") {
              let selectOptions = field.options || [];

              return (
                <label key={field.id} className="block mb-4 font-bold">
                  {field.label}
                  <Select
                    value={formData[field.id] || ""}
                    onValueChange={(value) => handleSelectChange(field.id, value, setFormData, onChange)}
                    className="mt-1"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue className="font-normal" />
                    </SelectTrigger>
                    <SelectContent className="font-normal">
                      {selectOptions.map((option) => (
                        <SelectItem
                          key={option.value || option.id}
                          value={option.value || option.id}
                          className="font-normal"
                        >
                          {option.label || option.name || option.full_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </label>
              );
            }
            if (field.type === "file") {
              return (
                <label key={field.id} className="block mb-4 font-bold">
                  {field.label}
                  <Input
                    type="file"
                    name={field.id}
                    accept={field.accept}
                    onChange={(e) => handleFileChange(e, setFormData)}
                    className="w-full p-2 mt-1 border rounded font-normal"
                  />
                  {images[field.id] && (
                    <img src={images[field.id]} alt={field.label} className="mt-2 max-h-40" />
                  )}
                </label>
              );
            }
            if (field.type === "date") {
              return (
                <label key={field.id} className="block mb-4 font-bold">
                  {field.label}
                  <Input
                    type="date"
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleChange(e, setFormData, onChange)}
                    className="w-full p-2 mt-1 border rounded font-normal"
                  />
                </label>
              );
            }
            return (
              <label key={field.id} className="block mb-4 font-bold">
                {field.label}
                <Input
                  type={field.type}
                  name={field.id}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(e, setFormData, onChange)}
                  className="w-full p-2 mt-1 border rounded font-normal"
                />
              </label>
            );
          })}

        </div>
        <br />
        <br />

        <SheetMultiStepFooter className="flex justify-between mt-5">
          {step > 0 && <Button className="btn" onClick={() => handlePrev(setStep)}>Anterior</Button>}
          {step < steps.length - 1 && <Button className="btn" onClick={() => handleNext(setStep)}>Siguiente</Button>}
          {step === steps.length - 1 && <Button className="btn" onClick={() => onSave({ ...formData })}>Guardar</Button>}
        </SheetMultiStepFooter>
      </SheetMultiStepContent>
    </SheetMultiStep>
  );
};

export default EntityFormMultiStep;