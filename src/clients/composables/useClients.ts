import { useQuery } from '@tanstack/vue-query';
import type { Client } from "@/clients/interfaces/client";
import clientsApi from '../../api/clients-api';
import { useClientStore } from '@/store/clients';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';


const getClients = async( page: number ):Promise<Client[]> => {
    
    // await new Promise( resolve => {
    //     setTimeout( () => resolve(true), 1500)
    // });
    
    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`);
    return data;
}

const useClients = () => {

    const store = useClientStore();
    const { currentPage, totalPages, clients } = storeToRefs( store );

    const { isLoading, data } = useQuery(
        ['clients?page=', currentPage],
        () => getClients( currentPage.value ),
        // { staleTime: 1000 * 60 }
    );

    watch( data, clients => {
        if( clients )
            store.setClients( clients );
    }, { immediate: true });

    return {
        // State Properties
        clients,
        currentPage,
        isLoading,
        totalPages,

        //Methods
        // getPage( page:number ) {
        //     store.setPage( page)
        // }
        //Esto es lo mismo que
        getPage: store.setPage,

        //Getter
        // totalPageNumbers: computed(
        //     () => [ ...new Array(totalPages.value)].map( (value, index) => index + 1)
        // )

    }
};

export default useClients;