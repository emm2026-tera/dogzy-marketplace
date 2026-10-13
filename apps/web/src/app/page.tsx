import { demoNfts, demoStats } from "@/lib/mockData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">DOGZY</p>
            <h1 className="mt-2 text-3xl font-bold">Avalanche NFT Marketplace</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              Demo mode
            </span>
            <button className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400">
              Launch App
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            { label: "TVL", value: demoStats.tvl },
            { label: "24h volume", value: demoStats.volume24h },
            { label: "Minted", value: demoStats.minted.toLocaleString() },
            { label: "Holders", value: demoStats.holders.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-cyan-950/10">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Marketplace</h2>
              <button className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
                Filters
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {demoNfts.map((nft) => (
                <article key={nft.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                  <img src={nft.image} alt={nft.name} className="h-56 w-full object-cover" />
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-semibold">{nft.name}</h3>
                      <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                        {nft.rarity}
                      </span>
                    </div>
                    <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
                      <span>Owner</span>
                      <span>{nft.owner}</span>
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-slate-400">Price</span>
                      <span className="text-xl font-bold text-cyan-300">{nft.priceAvax} AVAX</span>
                    </div>
                    <button
                      className={`w-full rounded-xl px-3 py-2 font-medium ${
                        nft.listed
                          ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                          : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                      }`}
                    >
                      {nft.listed ? "Buy now" : "Not listed"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Portfolio</p>
              <div className="mt-4 rounded-xl bg-slate-950 p-4">
                <p className="text-sm text-slate-400">Wallet</p>
                <p className="mt-2 text-lg font-semibold">0xA8F...213C</p>
                <p className="mt-4 text-3xl font-bold text-cyan-300">12.45 AVAX</p>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Owned NFTs</span>
                  <span>18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Listed</span>
                  <span>7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">DOGZY balance</span>
                  <span>24,300</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Mint</p>
              <div className="mt-4 space-y-3">
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0"
                  value="DOGZY Genesis #101"
                  readOnly
                />
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0"
                  value="ipfs://bafy...metadata"
                  readOnly
                />
                <button className="w-full rounded-xl bg-violet-500 px-3 py-2 font-medium text-white hover:bg-violet-400">
                  Mint NFT
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
