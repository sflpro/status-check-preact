module.exports = `
    select e."fullName", t1.*, t2.status from (
        select "employeeId", max("insertDate") as "insertDate"
        from transactions
        group by "employeeId"
    ) t1
    left join transactions t2
    on t1."employeeId" = t2."employeeId" and t1."insertDate" = t2."insertDate"
    join employees e
    on t1."employeeId" = e.code
`;
