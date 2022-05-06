import React from 'react';

import QExpertS2 from './QExpertS2';
import QProposalS2 from './QProposalS2';
import QRootNodeS2 from './QRootNodeS2';
import SlashingS2 from './SlashingS2';

import { PROPOSALS_TYPES } from 'constants/statuses';

function CreateStep2 ({ activeTab, register, errors, watch, setValue }) {
  switch (activeTab) {
    case PROPOSALS_TYPES.proposals:
      return <QProposalS2 register={register} errors={errors} />;
    case PROPOSALS_TYPES.rootNodePanel:
      return <QRootNodeS2 register={register} errors={errors} />;
    case PROPOSALS_TYPES.expertProposals:
      return <QExpertS2
        watch={watch}
        register={register}
        errors={errors}
      />;
    case PROPOSALS_TYPES.slashingProposals:
      return (
        <SlashingS2
          watch={watch}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      );
    default:
      return null;
  }
}

export default CreateStep2;
