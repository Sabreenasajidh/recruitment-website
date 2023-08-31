let server="http://localhost:9000";

const env={
    development:{

        api:server
    },
    staging:{

        api:server
    },
    production:{

        api:server,

    },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default{
    //...all,
    ...env[process.env.NODE_ENV],

};