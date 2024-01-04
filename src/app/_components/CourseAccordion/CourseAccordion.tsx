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
import { type Course, type Prisma } from "@prisma/client";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";

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

// https://github.com/prisma/prisma/discussions/10928

type Program = Prisma.ProgramGetPayload<{
  include: {
    foundationalCourses: {
      select: {
        courses: true;
      };
    };
    electiveGroups: {
      select: {
        requiredCourses: {
          select: {
            codeName: true;
            course: true;
          };
        };
        requiredCredits: true;
        electiveCourses: {
          select: {
            codeName: true;
            course: true;
          };
        };
        rules: true;
        name: true;
      };
    };
  };
}>;

export const CourseAccordion = ({ program }: { program: Program }) => {
  return (
    <Accordion type="single" collapsible className="w-[40vw]">
      <AccordionItem value="foundational">
        <AccordionTrigger>Foundational Courses</AccordionTrigger>
        <AccordionContent>
          <CourseTable data={program.foundationalCourses.courses} />
        </AccordionContent>
      </AccordionItem>

      {program.electiveGroups.map((electiveGroup) => (
        <AccordionItem value={electiveGroup.name} key={electiveGroup.name}>
          <AccordionTrigger>{electiveGroup.name}</AccordionTrigger>
          <AccordionContent>
            <CourseTable
              data={electiveGroup.requiredCourses.map(
                (course) => course.course,
              )}
            />
          </AccordionContent>

          <AccordionContent>
            <CourseTable
              data={electiveGroup.electiveCourses.map(
                (course) => course.course,
              )}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
