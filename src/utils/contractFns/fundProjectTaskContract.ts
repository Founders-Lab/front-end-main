import { AbiItem } from 'web3-utils';
import { getWeb3Instance } from 'utils/web3EventFn';
import ProjectAbi from 'contracts/abi/Project.sol/Project.json';
import { taskFactoryAddress } from 'contracts/contracts';
import toast from 'react-hot-toast';

const fundProjectTaskContract = async (
  amount: number,
  walletId: string | undefined,
  projectAddress: string
) => {
  try {
    if (!walletId) throw new Error('Unable to fund project task');

    const web3 = getWeb3Instance();

    // TODO - Instead of this, use ethers.utils.formatUnits(value, noOfDecimals)
    // If the decimals is 18 then ethers.utils.formatEther(value)

    const fundAmount = amount * 10 ** 6;

    const ProjectContract = new web3.eth.Contract(
      ProjectAbi.abi as AbiItem[],
      projectAddress
    );

    await ProjectContract.methods
      .fundProjectTask(taskFactoryAddress, projectAddress, fundAmount)
      .send({ from: walletId });
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};

export default fundProjectTaskContract;
