import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosIntercepter from "../../../hooks/useAxiosIntercepter";
import Book2 from "./Book2";
import { useQuery } from "react-query";
const AllBooks = () => {
  const axiosCustom = useAxiosIntercepter();
  let books = useLoaderData()?.number;
  let [perPage, setPerPage] = useState(5); 

  let [bookNumber, setbookNumber] = useState(books);
  let [currentPage, setCurrentPage] = useState(0);
let [available,setAvailable]=useState(false)
let [pageNumbers, setpageNumbers] = useState(Math.ceil(bookNumber / perPage)); 
const fetchBook= async () => {
  const res = await axiosCustom.get(`/books/${currentPage}?perpage=${perPage}&available=${available}`)
  setbookNumber(res.data.number)
  setpageNumbers(Math.ceil(res.data.number / perPage))
  return res;
};
  let {
    isLoading,
    data: booksData,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["bookData"],
    queryFn: fetchBook
  });


  
let handleFilter=()=>{

  setAvailable(!available)
  setCurrentPage(0);
  
}


  let handleClick = (page) => {
    setCurrentPage(page);
  };
  let handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };
 

  let numbers = [...Array(pageNumbers).keys()];

  useEffect(() => {
    refetch();
  }, [perPage, currentPage,bookNumber,refetch,available]);

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen min-w-screen flex mx-auto justify-center items-center">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }
  if (error) {
    return <h2>hdasdaio</h2>;
  }

  return (
    <section className="container mx-auto">
      <div className=" py-24">
      <div className="flex items-center justify-between bg-[#555353] text-[#ec7652] rounded-md p-4">
            <h1 className=" font-bold text-lg uppercase"> All Books</h1>
           <button onClick={handleFilter} className= "join-item btn   bg-[#4b2b53] btn-active">{available?'Show all':'Show Available'}</button>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 lg:pt-24 pt-10 px-4 lg:px-0">
          {booksData?.data?.result.map((book) => (
            <Book2 key={book._id} book={book}></Book2>
          ))}
        </div>
      </div>

      <div className=" grid gap-6 justify-center ">
        <div className="flex flex-wrap gap-4 justify-center ">
          {numbers.map((page, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === page
                  ? " text-[#A21942] bg-[#4b2b53] btn-active"
                  : ""
              }`}
              onClick={() => handleClick(page)}
            >
              {page + 1}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center ">
          <button
            className={` btn ${
              currentPage === 0 ? "btn-disabled" : "join-item"
            }`}
            onClick={() => {
              handleClick(currentPage - 1);
            }}
          >
            Previous
          </button>
          <select
            value={perPage}
            onChange={handlePerPage}
            className="select select-secondary "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>

          <button
            className={` btn ${
              currentPage === numbers.length - 1 ? "btn-disabled" : "join-item"
            }`}
            onClick={() => {
              handleClick(currentPage + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllBooks;
