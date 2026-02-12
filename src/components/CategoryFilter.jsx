const categories = [
    { value: 'Todos', label: 'Todos', icon: '🌍' },
    { value: 'Playa', label: 'Playa', icon: '🏖️' },
    { value: 'Montaña', label: 'Montaña', icon: '🏔️' },
    { value: 'Ciudad', label: 'Ciudad', icon: '🏙️' },
];

export default function CategoryFilter({ selected, onSelect }) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => onSelect(cat.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selected === cat.value
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                            : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-600'
                        }`}
                >
                    <span className="mr-1.5">{cat.icon}</span>
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
