"use client";

import { I18nProviderClient } from "@/locales/client";
import { PropsWithChildren } from "react";

export const IntProviders = (props: PropsWithChildren<{locale: string}>) =>{
    return(

        <I18nProviderClient locale={props.locale}>
            {props.children}
        </I18nProviderClient>
    );
}