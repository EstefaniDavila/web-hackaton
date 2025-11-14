import React from "react";
import GeneralTooltip from "@/helpers/generalTooltip";
import { Badge } from "@/components/ui/badge";

/* OBTENER LOS ESTADOS */
export const getBadgeStatus = (state) => {
  const statusTable = {
    active: (
      <GeneralTooltip content="Activo"
        triggerContent={<Badge variant="success" className="text-black">Activo</Badge>
        }>

      </GeneralTooltip>
    ),
    inactive: (
      <GeneralTooltip content="Inactivo"
        triggerContent={<Badge variant="inactive">Inactivo</Badge>}>
      </GeneralTooltip>
    )
  };

  return statusTable[state] || (
    <GeneralTooltip content="Desconocido">
      <Badge color="secondary">Desconocido</Badge>
    </GeneralTooltip>
  );
}
 
/* OBTENER LOS TIPOS DE DOCUMENTO */
export const getBadgeDocumentType = (state) => {
  const statusTable = {
    dni: (
      <GeneralTooltip
        content="D.N.I"
        triggerContent={<Badge variant="info">D.N.I</Badge>}
      />
    ),
    passport: (
      <GeneralTooltip
        content="Pasaporte"
        triggerContent={<Badge variant="info">Pasaporte</Badge>}
      />
    ),
    foreigner_card: (
      <GeneralTooltip
        content="Carnet de extranjería"
        triggerContent={<Badge variant="info">Carnet de extranjería</Badge>}
      />
    ),
  };

  return statusTable[state] || (
    <GeneralTooltip
      content="Desconocido"
      triggerContent={<Badge variant="inactive">Desconocido</Badge>}
    />
  );
}

export const getBadgeGender = (gender) => {
  const genderTable = {
    male: (
      <GeneralTooltip
        content="Masculino"
        triggerContent={<Badge variant="info">Masculino</Badge>}
      />
    ),
    female: (
      <GeneralTooltip
        content="Femenino"
        triggerContent={<Badge variant="info">Femenino</Badge>}
      />
    ),
  }

  return genderTable[gender] || (
    <GeneralTooltip
      content="Desconocido"
      triggerContent={<Badge variant="secondary">Desconocido</Badge>}
    />
  )
}