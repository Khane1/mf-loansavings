<script>
	import { calculateInterest, MoneyFormat, timestampToDateTime } from "../../../functions/func_essential";


    export let loan,index;
    function stringLength(name){
        return name.length>10?name.substring(0,10)+'..':name;
    }
</script>
<td class="pl-4 pr-1 py-2  text-sm font-medium text-gray-900 whitespace-nowrap"> {index+1}. </td>
<td class="px-6 py-2  text-sm font-medium text-gray-900 whitespace-nowrap"> {stringLength(loan.borrower)} </td>
<td class="px-6 py-2  text-sm font-medium text-gray-900 whitespace-nowrap"> {MoneyFormat(loan.Loan)} </td>
<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{calculateInterest(loan.interest,loan.Loan)}% </td>
<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap"> {MoneyFormat(loan.toBePaid)} </td>
<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
    {MoneyFormat(loan.interest)}
    <!-- {item.qty} -->
</td>
<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
        {MoneyFormat((loan.toBePaid-loan.balance))}
    <!-- {MoneyFormat(item.total)} -->
</td>
<td class="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
   {timestampToDateTime(loan.loan_date_iss)}
    <!-- {MoneyFormat(item.total)} -->
</td>