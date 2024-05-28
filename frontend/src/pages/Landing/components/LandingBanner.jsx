import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Push to Mint NFT.",
    description:
      "It has never been easy to mint your own NFT, the market is full of resources but we just brought 1-click NFT Mint for pre-uploaded image files. 🪄",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Privacy Enabled.",
    description:
      "The current build is bleeding edge (🗡️) still we managed to add privacy layer on Rose to make your data about files is private, and not even us can access. 👹",
    icon: LockClosedIcon,
  },
  {
    name: "IPFS Backed Up.",
    description:
      "Per IPFS, user needs to make their node up and running to pin files on network. Thus, we added persistent storage solution with our own 8M IPFS Server and Filecoin on almost 0$ subscription. 🦾",
    icon: ServerIcon,
  },
];

export default function LandingBanner() {
  return (
    <div className="overflow-hidden bg-white py-14 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Store Securely
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Rose is Non-Redundant Persistent Storage Solution.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Uncluttered file system for your need. You never have to worry
                about your device storage being full again. 🤯
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://ik.imagekit.io/13x54r/Screenshot%20from%202024-05-27%2018-57-01.png?updatedAt=1716850633733"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>

      <div className="divider mx-[5vw] pt-10"></div>

      <div className="bg-white my-10 mb-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl font-bold leading-8 text-gray-900">
            🔩 Dev tools behind Rose.
          </h2>
          <p className="mt-6 text-center text-lg leading-8 text-gray-600">
            Uncluttered file system for your need. You never have to worry about
            your device storage being full again. 🤯
          </p>
          <p className=" text-center text-lg leading-8 text-gray-600">
            Thanks to the for sponsoring and making Rose happen. 💥
          </p>
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-6 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://imgs.search.brave.com/kBjcUY6rx-et5tPQst0igZe_CAer5ztnLzqw-eTNrUQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRiL0ZpbGVjb2lu/LnN2Zw.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://imgs.search.brave.com/yBmfKd96aBXOAR9gdXTVDC2M-XBBU3dvJN7MZ0Pnr4c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdG9y/YWdlYXBpLmZsZWVr/Lm9uZS9mbGVlay10/ZWFtLWJ1Y2tldC9z/aXRlL2ZsZWVrLWZv/b3Rlci5wbmc"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://blog.ens.domains/icons/ens_logo_primary.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://imgs.search.brave.com/Ig0IWmBx-C5JawARV1ZQFyBQ5gMUtLPGaZ4uyhtumsQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9nbG9i/YWwuZGlzY291cnNl/LWNkbi5jb20vYnVz/aW5lc3M3L3VwbG9h/ZHMvaXBmczEvb3Jp/Z2luYWwvMlgvYi9i/YmI4MDJkMzM1ZWUy/MGM1MzM5ODUwZmJk/NGFkM2I0ZGZmZGZj/MGJjLndlYnA"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://imgs.search.brave.com/G2k0kz1nB5q0ieIlUVaY6FAKfjmm0QWLuUuGSL2p6KA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9sb2dv/dHlwLnVzL2ZpbGUv/ZXRoZXJldW0uc3Zn.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://docs.squidrouter.com/~gitbook/image?url=https%3A%2F%2F4247625265-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FtXbXyuWIO2PwzNc5Dets%252Ficon%252FIhc4gzUn2p55dZQZf7Ec%252FSquid_Icon_Logo_Yellow.png%3Falt%3Dmedia%26token%3D1914e11e-a3ce-445e-be9e-c4dadeb7ff41&width=32&dpr=1&quality=100&sign=c6001b4ea4c24c45f04bd1ffe7112870e091889b10f8c614c093eb08841ff81b"
              alt="Statamic"
              width="158"
              height="48"
            />
          </div>
        </div>
      </div>

      <div
        className="mx-auto block text-center flex items-center justify-center text-semibold gap-1"
        onClick={() =>
          window.open("https://github.com/13x54n/hackfs-rose", "_blank")
        }
      >
        <span>HackFS 2024 -</span>
        <img
          src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
          className="w-8"
          alt=""
        />
        <span className="cursor-pointer">
          {" "}
          <u>Rose</u>. MIT License.
        </span>
      </div>
    </div>
  );
}
