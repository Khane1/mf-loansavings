<script>
    	import CtmrDtl from '../../../components/reuseable/customer/ctmrDtl.svelte';
	import Modal from '../../../components/reuseable/modal/modal.svelte';
	import { MoneyFormat, calculateInterest } from '../../../functions/func_essential';
	import { businessStore } from '../../../functions/funcs/stores';
	export let inComplete, complete, cashIn, loansGiven;
	let formNo = 1;
	$: activeRepTtl = inComplete.reduce((a, { data }) => a + (data.toBePaid - data.balance), 0);
	let interest = inComplete.reduce(
		(a, { data }) => a + calculateInterest(data.interest, data.Loan),
		0
	);
	$: capital = $businessStore.capital;
</script>
<div class="flex justify-evenly space-x-5 ">
    <div class="mr-3 w-80  px-3  rounded-lg">
        <CtmrDtl title={'Capital'} data={MoneyFormat($businessStore.capital)} />
        <hr />
        <CtmrDtl title={'CashOut'} data={MoneyFormat(loansGiven)} />
        <CtmrDtl title={'CashIn'} data={MoneyFormat(cashIn)} />
        <CtmrDtl
            title={'Active repayment total'}
            data={MoneyFormat(inComplete.length == 0 ? 0 : activeRepTtl)}
        />
        <hr />

        <CtmrDtl
            title={'Closed Loan Total'}
            data={MoneyFormat(
                complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.toBePaid, 0)
            )}
        />
        <CtmrDtl
            title={'Profit Made'}
            data={MoneyFormat(
                complete.length == 0 ? 0 : complete.reduce((a, { data }) => a + data.interest, 0)
            )}
        />
    </div>
</div>