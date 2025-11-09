import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from 'app/components/ui/pagination';

type PaginationButtonsProps = {
  page: number;
  totalPages: number;
};

const PaginationButtons = ({ totalPages, page }: PaginationButtonsProps) => {
  return (
    <Pagination className='mt-10'>
      <PaginationContent className='w-full  max-w-2xl gap-8 justify-center items-center'>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious
              href={`/properties?page=${page - 1}`}
              className='border bg-blue-500 text-white hover:bg-blue-600'
            />
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <p className='text-muted-foreground text-sm' aria-live='polite'>
            Page <span className='text-foreground'>{page}</span> of{' '}
            <span className='text-foreground'>{totalPages}</span>
          </p>
        </PaginationItem>
        {page < totalPages ? (
          <PaginationItem>
            <PaginationNext
              href={`/properties?page=${page + 1}`}
              className='border bg-blue-500 text-white hover:bg-blue-600'
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationButtons;
