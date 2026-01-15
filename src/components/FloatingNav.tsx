import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './shared/Icon';
import { allPrototypes } from '../prototypes';

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const currentExperiment = allPrototypes.find(exp => exp.route === location.pathname);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300 ease-out
          ${isOpen 
            ? 'bg-emerald-600 text-white rotate-180' 
            : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
          }
          border border-gray-200
        `}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <Icon name="X" size="lg" />
        ) : (
          <Icon name="Grid" size="lg" />
        )}
      </button>

      {/* Navigation Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100">
            <h3 className="text-sm font-semibold text-gray-900">Experiments</h3>
            <p className="text-xs text-gray-600 mt-0.5">Switch between prototypes</p>
          </div>

          {/* Experiment List */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {allPrototypes.map((prototype) => {
              const isActive = location.pathname === prototype.route;
              return (
                <Link
                  key={prototype.route}
                  to={prototype.route}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-3 mx-2 my-1 rounded-lg
                    transition-all duration-200
                    ${isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isActive ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {prototype.name}
                        </span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        )}
                      </div>
                      {prototype.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {prototype.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <Icon name="Arrow left" size="sm" />
              Back to Home
            </Link>
          </div>
        </div>
      )}

      {/* Current Experiment Badge (when closed) */}
      {!isOpen && currentExperiment && (
        <div className="absolute bottom-16 right-0 px-3 py-1.5 bg-white rounded-lg shadow-md border border-gray-200 whitespace-nowrap animate-[fadeIn_0.2s_ease-out]">
          <p className="text-xs font-medium text-gray-700">{currentExperiment.name}</p>
        </div>
      )}
    </div>
  );
}
