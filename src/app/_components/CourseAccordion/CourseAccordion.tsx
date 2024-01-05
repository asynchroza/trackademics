"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Course } from "@prisma/client";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import type { FetchedRulesProgram } from "~/types/extendedPrismaTypes";

type PickedCourse = Pick<Course, "codeName" | "name">;

const columnHelper = createColumnHelper<PickedCourse>();

const columns = [
  columnHelper.accessor("codeName", {
    header: () => "Code",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
];

function CourseTable({ data }: { data: PickedCourse[] }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!table.getRowModel().rows?.length) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                // NOTE: setting fixed width here aligns columns
                <TableCell key={cell.id} className="w-[20vw]">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// TODO: Add logic for making an elective group required
export const CourseAccordion = ({
  program,
}: {
  program: FetchedRulesProgram;
}) => {
  return (
    <Accordion type="single" collapsible className="w-[40vw]">
      <AccordionItem value="foundational">
        <AccordionTrigger>Foundational Courses</AccordionTrigger>
        <AccordionContent>
          <p className="text-slate-600">
            Successful completion of this specific set of prerequisite courses
            is required for graduation from this program.
          </p>
          <CourseTable data={program.foundationalCourses.courses} />
        </AccordionContent>
      </AccordionItem>

      {program.electiveGroups.map((electiveGroup) => (
        <AccordionItem value={electiveGroup.name} key={electiveGroup.name}>
          <AccordionTrigger>{electiveGroup.name}</AccordionTrigger>
          <AccordionContent>
            <p className="text-slate-600">
              {electiveGroup.required ? "Required" : "Allowed"} total credits
              from this elective group: {electiveGroup.requiredCredits}
            </p>
            {electiveGroup.requiredCourses.length != 0 ? (
              <p className="text-slate-600">
                To fulfill the requirements of this elective group, the courses
                below are mandatory:
              </p>
            ) : null}
            <CourseTable
              data={electiveGroup.requiredCourses.map(
                (course) => course.course,
              )}
            />
          </AccordionContent>

          <AccordionContent>
            <p className="text-slate-600">
              The courses below are elective, affording you the flexibility to
              choose those that align with the group&#39;s requirements based on
              your preferences:
            </p>
            <CourseTable
              data={[
                ...electiveGroup.electiveCourses.map((course) => course.course),
                ...(electiveGroup.ruledOutElectiveCourses
                  ? electiveGroup.ruledOutElectiveCourses.map(
                      (course) => course,
                    )
                  : []),
              ]}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
