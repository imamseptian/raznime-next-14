import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CustomTooltipProps {
  openDelay?: number;
  side?: 'right' | 'top' | 'bottom' | 'left' | undefined;
  content: React.ReactNode,
  children: React.ReactNode
}

/**
 * Renders a custom tooltip component to wrap  user custom content.
 *
 * @param {CustomTooltipProps} props - The props for the custom tooltip component.
 * @param {number} [props.openDelay=500] - The delay in milliseconds before the tooltip is displayed.
 * @param {'right' | 'top' | 'bottom' | 'left' | undefined} [props.side='right'] - The side of the trigger element where the tooltip should be displayed.
 * @param {React.ReactNode} props.content - The content to display in the tooltip.
 * @param {React.ReactNode} props.children - The trigger element for the tooltip.
 * @return {React.ReactElement} The rendered custom tooltip component.
 */
export default function CustomTooltip({
  openDelay = 500,
  side = 'right',
  content,
  children,
}: CustomTooltipProps) {
  return (
    <HoverCard openDelay={ openDelay }>
      <HoverCardTrigger asChild>
        { children }
      </HoverCardTrigger>

      <HoverCardContent side={ side } className="w-[400px] hidden lg:block bg-popover/75 backdrop-blur-sm">
        { content }
      </HoverCardContent>
    </HoverCard>
  );
}
