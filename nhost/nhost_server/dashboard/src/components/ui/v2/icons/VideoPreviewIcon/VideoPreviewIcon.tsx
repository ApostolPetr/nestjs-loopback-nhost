import type { IconProps } from '@/components/ui/v2/icons';
import { SvgIcon } from '@/components/ui/v2/icons/SvgIcon';

export default function VideoPreviewIcon(props: IconProps) {
  return (
    <SvgIcon
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Video file"
      {...props}
    >
      <path
        d="M13.5005 15H2.5C2.36739 15 2.24021 14.9473 2.14645 14.8536C2.05268 14.7598 2 14.6326 2 14.5V1.5C2 1.36739 2.05268 1.24021 2.14645 1.14645C2.24021 1.05268 2.36739 1 2.5 1H10.5005L14.0005 4.5V14.5C14.0005 14.5657 13.9876 14.6307 13.9624 14.6913C13.9373 14.752 13.9005 14.8071 13.854 14.8536C13.8076 14.9 13.7525 14.9368 13.6918 14.9619C13.6312 14.9871 13.5661 15 13.5005 15Z"
        fill="#9C73DF"
      />
      <path
        d="M10.5 1V3.5C10.5 4.05228 10.9477 4.5 11.5 4.5H14.0005"
        fill="#6D1EEE"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 6.5H4.75C4.6837 6.5 4.62011 6.52634 4.57322 6.57322C4.52634 6.62011 4.5 6.6837 4.5 6.75V9.75C4.5 10.0152 4.60536 10.2696 4.79289 10.4571C4.98043 10.6446 5.23478 10.75 5.5 10.75H9.5C9.5663 10.75 9.62989 10.7237 9.67678 10.6768C9.72366 10.6299 9.75 10.5663 9.75 10.5V9.125L12 10.25V7L9.75 8.125V7.5C9.75 7.23478 9.64464 6.98043 9.45711 6.79289C9.26957 6.60536 9.01522 6.5 8.75 6.5Z"
        fill="white"
      />
    </SvgIcon>
  );
}
