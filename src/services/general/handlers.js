import axios from "axios";

export const handleRemoveProfessor = async (professorId, programId, setFormData, onChange, mutate) => {
  const apiPath = `/api/v1/admin/program_professors/delete/${programId}/professor/${professorId}/delete`;
  try {
    await axios.delete(apiPath)
      .then(() => {
        setFormData((prevData) => {
          const updatedProfessors = (prevData.professors || []).filter(id => id !== professorId);
          onChange('professors', updatedProfessors);
          return { ...prevData, professors: updatedProfessors };
        });
      })
      .catch((error) => {
        console.error('Error removing professor:', error);
      });
  } catch (error) {
    console.error('Error removing professor:', error);
  }
}

export function handleNext(setStep) {
  setStep((prevStep) => prevStep + 1)
}

export function handlePrev(setStep) {
  setStep((prevStep) => prevStep - 1)
}

export function handleChange(e, setFormData, onChange) {
  const { name, value } = e.target
  setFormData((prevData) => {
    const updatedData = { ...prevData, [name]: value }
    if (name === "academic_hours") {
      updatedData.lecture_hours = value * 3
    }
    onChange(name, value)
    return updatedData
  })
}

export function handleSelectChange(name, value, setFormData, onChange) {
  setFormData((prevData) => {
    const updatedData = { ...prevData, [name]: value }
    onChange(name, value)
    return updatedData
  })
}

export function handleChangeFD(e, formData, setFormValues) {
  const { name, value } = e.target
  formData.set(name, value)
  setFormValues((prevData) => {
    const updatedData = { ...prevData, [name]: value }
    return updatedData
  })
}

export function handleSelectChangeFD(name, value, formData, setFormValues) {
  formData.set(name, value)
  setFormValues((prevData) => {
    const updatedData = { ...prevData, [name]: value }
    return updatedData
  })
}

export function handleFileFD(e, formData, setFormValues) {
  const { name, files } = e.target;

  if (!files || files.length === 0) return;
  const file = files[0];

  formData.set(name, file);

  setFormValues((prev) => ({
    ...prev,
    [name]: file.name,
  }));
}


export function handleFileChange(e, setFormData) {
  const { name, files } = e.target
  const file = files[0]
  
  if (file) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg']
    const maxSizeInBytes = 500 * 1024 

    if (!validImageTypes.includes(file.type)) {
      alert('Solo se permiten archivos de imagen (JPEG, PNG, JPG).')
      return
    }

    if (file.size > maxSizeInBytes) {
      alert('El archivo no debe exceder los 500 KB.')
      return
    }

    setFormData((prevData) => ({ ...prevData, [name]: file }))
  }
}

