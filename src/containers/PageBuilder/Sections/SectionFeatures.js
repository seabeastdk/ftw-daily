import React from 'react';
import classNames from 'classnames';

import Field, { pickValidProps } from '../Fields/Field.js';
import BlockBuilder from '../Blocks/BlockBuilder.js';

import SectionTag from './SectionTag.js';
import css from './SectionFeatures.module.css';

// TODO This is only an example. There's no example for this yet
const SectionFeatures = props => {
  const {
    className,
    defaultClasses,
    sectionId,
    numColumns,
    title,
    ingress,
    background,
    backgroundImage,
    callToAction,
    theme = 'light',
    blocks,
    options,
  } = props;

  // If external mapping has been included for fields
  // E.g. { h1: { component: MyAwesomeHeader } }
  const fieldComponents = options?.fieldComponents;
  const fieldOptions = { fieldComponents };

  // TODO do we support this in Console?
  // Find background color if it is included
  const fixedBackgroundData = { ...background, type: 'hexColor' }; // TODO remove if type is included
  const colorProp = pickValidProps(fixedBackgroundData, fieldOptions);
  const backgroundColorMaybe = colorProp.color ? { backgroundColor: colorProp.color } : {};

  // TODO do we support this in Console?
  // Create Image field for background image
  // This will be passed to SectionTag as responsive "background" image
  const backgroundImageMaybe = backgroundImage
    ? {
        backgroundImage: (
          <Field
            data={{ ...backgroundImage, type: 'backgroundImage', bgColor: '#00AAFF' }}
            className={defaultClasses.backgroundImage}
            options={fieldOptions}
          />
        ),
      }
    : {};

  return (
    <SectionTag
      id={sectionId}
      className={className}
      style={backgroundColorMaybe}
      {...backgroundImageMaybe}
    >
      <header className={defaultClasses.sectionDetails}>
        <Field className={defaultClasses.title} data={title} options={fieldOptions} />
        <Field data={ingress} className={defaultClasses.ingress} options={fieldOptions} />
        <Field data={callToAction} className={defaultClasses.ctaButton} options={fieldOptions} />
      </header>
      {blocks ? (
        <div className={classNames(defaultClasses.singleColumn, css.featuresMain)}>
          <BlockBuilder
            className={css.blockTag}
            mediaClassName={css.media}
            textClassName={css.text}
            blocks={blocks}
            options={options}
          />
        </div>
      ) : null}
    </SectionTag>
  );
};

export default SectionFeatures;
