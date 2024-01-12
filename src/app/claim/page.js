import ClaimForm from "../components/ClaimForm";

export const metadata = {
  title: "Claim",
  description: "Vela sBTC Claim Reward Demo",
};

export default function Claim() {
  return (
    <div className="min-h-screen text-white bg-gray-800" id="claim-div">
      <h2 className="my-6 text-3xl text-center">Call Claim Function</h2>
      <ClaimForm />
    </div>
  );
}
