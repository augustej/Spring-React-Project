function TableComponent({details}){

    return(
        <>
            {details.length > 0? 
            <div className="table">
                <div className="first-row row">
                <p>Name</p>
                <p>Email</p>
                <p>Phone Number</p>
                </div>
                {details.map((tablerow, index) => {
                    return (<div className="row" key={index}>
                        <p>{tablerow.name}</p>
                        <p>{tablerow.email}</p>
                        <p>{tablerow.phone}</p>
                        </div>)
                }) }
            </div>
            : ""}
        </>
    )

}
export default TableComponent