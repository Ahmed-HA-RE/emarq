import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'app/components/ui/pagination';

import { cn } from 'app/lib/utils';

type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationButtons = ({
  totalPages,
  currentPage,
}: PaginationButtonsProps) => {
  const totalPagesArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className='mt-10'>
      <PaginationContent className=' gap-0 overflow-hidden rounded-lg border'>
        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={`/properties?page=${currentPage - 1}`}
              className='rounded-none'
            />
          </PaginationItem>
        ) : null}
        {totalPagesArr.map((page) => {
          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={`/properties?page=${page}`}
                className={cn(
                  'bg-gray-200',
                  'text-black',
                  'hover:bg-blue-500',
                  'hover:text-white',
                  'border',
                  isActive && 'bg-blue-500 text-white',
                  'rounded-none border-none'
                )}
                isActive={isActive}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationContent className='gap-0 divide-x overflow-hidden rounded-none'>
          {currentPage < totalPages ? (
            <PaginationItem>
              <PaginationNext
                href={`/properties?page=${currentPage + 1}`}
                className='rounded-none'
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationButtons;
