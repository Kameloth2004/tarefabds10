import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { Employee } from 'types/employee';
import { AxiosRequestConfig } from 'axios';
import { BASE_URL, requestBackend } from 'util/requests';

import './styles.css';


const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/employees/',
      baseURL: BASE_URL,
      params: {
        page: currentPage,
        size: 4
      },
      withCredentials: true,

    };

    requestBackend(params)
      .then(response => {
        setPage(response.data);
        console.log(page);
      });

  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link>

      {page?.content.map(employee => {
        return (

          <div className='card' key={employee.id}>
            <EmployeeCard employee={employee} />
          </div>

        );
      })}


      <div className="row">
        <Pagination
          pageCount={page?.totalPages ?? 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default List;
