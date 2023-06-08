import { ethers } from "ethers";
import timestampAbi from "./abi.json";
import axios from "axios";
import wait from "src/utils/wait";
import toast from "react-hot-toast";

const contAddress = "0xF18a413ACFe3dcBB2e1f346C891Cc7b11E96c7b8";
const provider = new ethers.providers.Web3Provider(window.ethereum)

class BlockchainApi {
    async certify(checksum, reportId) {
        try {
            console.log(checksum)
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contAddress, timestampAbi, signer);
            const transaction = await contract.certify("0x".concat(checksum));
            const rc = await transaction.wait();
            const event = rc.events.find((event2) => event2.event === 'createCertEvent');
            const [txnId, boolVal] = event.args;

            axios.post(`http://localhost:3000/reports/timestamp/${reportId}/${txnId}`)
                .then((resp) => {
                    toast.success("Success!")
                }).catch((er) => {
                    toast.error("Something went wrong!")
                })

            return transaction
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async verify(txnId) {
        try {
            console.log(txnId)
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contAddress, timestampAbi, signer);
            const resp = await contract.verify(txnId);
            console.log(resp)
            // eslint-disable-next-line @typescript-eslint/dot-notation
            console.log(parseInt(resp[3]['_hex'], 16))
            // eslint-disable-next-line @typescript-eslint/dot-notation
            toast.success("This report submitted at: \n".concat(this.epochToDateTime(parseInt(resp[3]['_hex'], 16))), { duration: 10000 })
            return resp[3];
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    epochToDateTime(epoch) {
        const date = new Date(epoch * 1000); // Convert epoch to milliseconds
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Format the date/time string
        const dateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return dateTime;
    }
}

export const blockchainApi = new BlockchainApi();
