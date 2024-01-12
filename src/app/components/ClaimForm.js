"use client";

import { useContext } from "react";
import { uintCV, listCV, standardPrincipalCV, contractPrincipalCV, callReadOnlyFunction, PostConditionMode} from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { openContractCall,  } from '@stacks/connect';

import { UserContext } from "../UserContext";

export default function ClaimForm() {
  const { userData } = useContext(UserContext);

  const buildTransaction = async () => {
    const network = new StacksTestnet();
    const contractAddress = 'ST20X3DC5R091J8B6YPQT638J8NR1W83KN6JQ4P6F';
    const contractName = 'wstx-sbtc-farming-distributor';
    const functionName_distribute_epochs = 'distribute-epochs';
    const functionName_get_reward = 'get-reward';
    const tokenAddress = 'ST20X3DC5R091J8B6YPQT638J8NR1W83KN6JQ4P6F';
    const tokenName = 'velar';
    const epoch = 7;
    const senderAddress = userData.profile.stxAddress.testnet;

    // get-reward
    const functionArgs_get_reward = [
      standardPrincipalCV(senderAddress),
      uintCV(epoch),
    ]

    const options_get_reward = {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: functionName_get_reward,
      functionArgs: functionArgs_get_reward,
      senderAddress: senderAddress,
      network: network,
    };
    await callReadOnlyFunction(options_get_reward).then(res => {
      console.log(res);
    });

    // distribute-epochs
    const functionArgs_distribute_epochs = [
      standardPrincipalCV(senderAddress),
      contractPrincipalCV(tokenAddress, tokenName),
      listCV([uintCV(epoch)]),
    ]

    const options_distribute_epochs = {
      contractAddress: contractAddress,
      contractName: contractName,
      functionName: functionName_distribute_epochs,
      functionArgs: functionArgs_distribute_epochs,
      senderAddress: senderAddress,
      network: network,
      postConditionMode: PostConditionMode.Allow,
      appDetails: {
        name: 'Vela sBTC Claim Reward Demo',
        icon: window.location.origin + '/favicon.ico',
      },
      onFinish: (data) => {
        console.log('Transaction ID:', data.txId);
        console.log('Raw transaction:', data.txRaw);
      },
      onCancel: () => {
        console.log('User canceled the transaction');
      }
    };
    await openContractCall(options_distribute_epochs);
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="px-6 py-2 bg-orange-500 rounded hover:bg-orange-600 focus:outline-none"
        onClick={buildTransaction}
      >
        Claim
      </button>
    </div>
  );
}
