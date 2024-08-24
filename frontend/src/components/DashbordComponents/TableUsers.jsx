import React, { useMemo } from 'react'
 import { 
        useReactTable, 
        getCoreRowModel, 
        getPaginationRowModel, 
        getSortedRowModel ,
        flexRender,
        createColumnHelper,
     } from '@tanstack/react-table'; 


const TableUsers = ({users}) => {


   const columnHelper=createColumnHelper();

   // define Columns:
    const columns=useMemo(
        ()=>[
               columnHelper.accessor('id',{
                 header:'ID',
               }),
            
                columnHelper.accessor('first_name',{
                    header:'First Name',
                }),
              
                columnHelper.accessor('last_name',{
                    header:'Last Name',
                }),

                columnHelper.accessor('email',{
                    header:'Email',
                }),

        ],[columnHelper]           
    )

    //useMemo

    const finalData=useMemo(()=>users,[users]);
    
    // create table instance:
    const tableInstance=useReactTable({

        columns: columns,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        initialState:{pagination:{pageSize:10}},
        
    })

    
  console.log('tessssst:',tableInstance.getHeaderGroups());


  return (
    <div>
        <table className='w-full'>
            {/* the header */}
            <thead className='w-full'>
                {
                    tableInstance.getHeaderGroups().map(headerGroup=>(
                        <tr key={headerGroup.id}>
                             {
                                headerGroup.headers.map(column=>(
                                    <th className='border-white border-2 py-4 px-10 bg-gradient-to-t  from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 transition-colors duration-500 ease-in-out text-white font-semibold  '
                                      key={column.id}>
                                       {flexRender(
                                          column.column.columnDef.header,
                                          column.getContext()
                                       )}
                                    </th>
                                ))
                             }
                        </tr>
                    ))
                }
            </thead>
            <tbody>
                {
                    tableInstance.getPaginationRowModel().rows.map((row,index)=>(
                        <tr key={row.id} className={`${index%2===0?'bg-indigo-50':''} hover:font-semibold cursor-pointer transition-font transition-colors ease-in-out duration-500 text-indigo-900 hover:bg-indigo-200`}>
                            {row.getVisibleCells().map((cell)=>(
                                <td  key={cell.id}
                                     className='p-3'
                                >
                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
        {/* pagination controle */}
        <div className='ml-40 p-10'>
            <button
                 className='px-4 py-2 disabled:opacity-20'
                 onClick={()=>tableInstance.previousPage()}
                 disabled={!tableInstance.getCanPreviousPage()}
            >
                Previous
            </button>

            <span>
                Page{' '}
                <strong>
                    {tableInstance.getState().pagination.pageIndex+1} of{' '}
                    {tableInstance.getPageCount()}
                </strong>
            </span>

            <button
                className=' px-4 py-2 disabled:opacity-20'
                onClick={()=>tableInstance.nextPage()}
                disabled={!tableInstance.getCanNextPage()} 
            >
                Next
            </button>
        </div>
    </div>
  )
}

export default TableUsers
