/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, properties }) => (
  <p
    className={cx(
      'block image align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    {properties.image && (
      <>
        {(() => {
          const url = properties.image.download.split('/@@images')[0];
          const image = (
            <picture className={cx({ 'full-width': data.align === 'full' })}>
              <source
                srcSet={`
            ${flattenToAppURL(url)}/@@images/image/mini 200w,
            ${flattenToAppURL(url)}/@@images/image/preview 400w,
            ${flattenToAppURL(url)}/@@images/image/large 800w,
            ${flattenToAppURL(url)}/@@images/image/great 1200w,
            ${flattenToAppURL(url)}/@@images/image/huge 1600w
            `}
                sizes={
                  data.align === 'full'
                    ? '100vw'
                    : data.align === 'left' || data.align === 'right'
                    ? '(min-width: 1200px) calc(1127px * 0.333), (min-width: 992px) calc(933px * 0.333), (min-width: 768px) calc(723px * 0.333), calc((100vw - (1em * 2)) * 0.5)'
                    : '(min-width: 1200px) 1127px, (min-width: 992px) 933px, (min-width: 768px) 723px, calc(100vw - (1em * 2))'
                }
              />
              <img
                src={flattenToAppURL(properties.image.download)}
                alt={properties.image_caption || ''}
              />
            </picture>
          );
          if (data.href) {
            if (
              (data.href.startsWith('http') || data.href.startsWith('https')) &&
              !data.href.includes(settings.apiPath)
            ) {
              return (
                <a
                  target={data.openLinkInNewTab ? '_blank' : null}
                  href={data.href}
                >
                  {image}
                </a>
              );
            } else {
              return (
                <Link
                  to={data.href.replace(settings.apiPath, '')}
                  target={data.openLinkInNewTab ? '_blank' : null}
                >
                  {image}
                </Link>
              );
            }
          } else {
            return image;
          }
        })()}
      </>
    )}
  </p>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
