import { cn } from "~/lib/utils/cn";
import Tag from "./Tag";
import Button from "./Button";

type ProjectCardProps = {
  img?: string;
  title: string;
  subtitle: string;
  used?: string[];
  href?: string;
  button?: string;
  reverse?: boolean;
};

function ProjectCard({
  img,
  title,
  subtitle,
  used = [],
  href,
  button,
  reverse,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row justify-between border rounded-xl border-gray-200 overflow-hidden",
        reverse && "md:flex-row-reverse"
      )}
    >
      <div className="flex items-center justify-center w-full md:w-1/2 p-6 md:p-12 bg-gray-50">
        {img ? (
          <img
            className="rounded"
            src={img}
            loading="lazy"
            alt={title || "Project image"}
          />
        ) : (
          <div className="text-gray-400 italic">No image</div>
        )}
      </div>

      <div className="flex flex-col gap-6 w-full md:w-1/2 p-6 md:p-12 bg-gray-100 border-t md:border-t-0 md:border-l border-gray-200 items-start">
        <span className="subtitle text-gray-900">{title}</span>
        <p className="body2 text-gray-600">{subtitle}</p>

        {used?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {used.map((tech, index) => (
              <Tag key={index}>{tech}</Tag>
            ))}
          </div>
        )}

        {href && button && (
          <Button className="body2" href={href} target="_blank">
            {button}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
