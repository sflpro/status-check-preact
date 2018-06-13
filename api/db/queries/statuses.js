module.exports = `
    select e."fullName", t1.*,
    (case e.active when true then 'in' else 'out'end) as "status"
    from (
        select "employeeId" as "id", max("originalDate") as "lastStatusChange"
        from transactions
        group by "employeeId"
    ) t1
    left join transactions t2
    on t1."id" = t2."employeeId" and t1."lastStatusChange" = t2."originalDate"
    join employees e
    on t1."id" = e.code
`;
