from enum import Enum
from pydantic import BaseModel

class WalletType(str,Enum):
    primary = 'primary'
    secondary = 'secondary'
    
class ChainType(str,Enum):
    solana = 'solana'
    etherium = 'etherium'
    

#NOTE - Regex for Phone
PHONE_REGEX = r'^\+\d{10,15}$'