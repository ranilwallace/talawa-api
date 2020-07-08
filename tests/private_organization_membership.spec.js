const axios = require("axios");
const {
    URL
} = require("../constants");
const getToken = require("./functions/getToken");
const shortid = require("shortid");

let token;
beforeAll(async () => {
    token = await getToken();
});


describe("Private Organization Membership Tests", async () => {

    let createdOrganizationId;
    // Private Organization is created - by default user
    const createdOrganizationResponse = await axios.post(
        URL, {
            query: `
            mutation {
                createOrganization(data: {
                    name:"test org"
                    description:"test description"
                    isPublic: false
                    }) {
                        _id
                        name
                    }
            }
            `,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    createdOrganizationId = createdOrganizationResponse.data.data.createOrganization._id



    //New user is created
    let newUserToken;
    let newUserId;
    let id = shortid.generate();
    let email = `${id}@test.com`;
    const response = await axios.post(URL, {
        query: `
        mutation {
            signUp(data: {
            firstName:"testdb2",
            lastName:"testdb2"
            email: "${email}"
            password:"password"
            }) {
            userId
            token
            }
        }
        `,
    });
    const signUpData = response.data;
    newUserToken = signUpData.data.signUp.token;
    newUserId = signUpData.data.signUp.userId;


    //New user sends membership request to join organization
    test("User sends private organization membership request", async () => {
        const sendRequestResponse = await axios.post(
            URL, {
                query: `
                    mutation{
                    sendMembershipRequest(organizationId: "${createdOrganizationId}"){
                        _id
                    }
                }`,
            }, {
                headers: {
                    Authorization: `Bearer ${newUserToken}`,
                },
            }
        );
        const sendRequestData = sendRequestResponse.data;
        expect(sendRequestData.data.sendMembershipRequest).toEqual(
            expect.objectContaining({
                _id: expect.any(String)
            })
        );
    })

    //admin rejects membership request

    //new user re-sends membership request to join organization

    //admin accepts membership request
})