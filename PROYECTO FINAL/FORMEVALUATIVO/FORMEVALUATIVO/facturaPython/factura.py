import os
import re
from tabulate import tabulate

# Lista de contactos
agenda = []

def limpiar_pantalla():
    """Limpia la consola según el sistema operativo."""
    os.system('cls' if os.name == 'nt' else 'clear')

def es_email_valido(email):
    """Verifica si un correo electrónico tiene un formato válido."""
    patron = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(patron, email)

def crear_contacto():
    """Crea un nuevo contacto."""
    limpiar_pantalla()
    print("📞 Agregar Nuevo Contacto")
    documento = input("Documento: ")
    if any(contacto["Documento"] == documento for contacto in agenda):
        print("⚠️ El documento ya existe. Intente con otro.")
        input("Presiona Enter para continuar...")
        return
    nombre = input("Nombre: ")
    telefono = input("Teléfono: ")
    correo = input("Correo: ")
    while not es_email_valido(correo):
        print("❌ Correo inválido. Ingrese un email válido con '@'.")
        correo = input("Correo: ")
    direccion = input("Dirección: ")
    ciudad = input("Ciudad de Residencia: ")
    contacto = {"Documento": documento, "Nombre": nombre, "Teléfono": telefono, "Correo": correo, "Dirección": direccion, "Ciudad": ciudad}
    agenda.append(contacto)
    print("✅ Contacto agregado con éxito!")
    input("Presiona Enter para continuar...")

def ver_contactos():
    """Muestra todos los contactos en una tabla."""
    limpiar_pantalla()
    print("📋 Lista de Contactos")
    if not agenda:
        print("⚠️ No hay contactos guardados.")
    else:
        print(tabulate(agenda, headers="keys", tablefmt="fancy_grid"))
    input("Presiona Enter para continuar...")

def actualizar_contacto():
    """Actualiza un contacto existente."""
    limpiar_pantalla()
    ver_contactos()
    documento = input("Ingrese el documento del contacto a actualizar: ")
    for contacto in agenda:
        if contacto["Documento"] == documento:
            contacto["Nombre"] = input(f"Nuevo nombre ({contacto['Nombre']}): ") or contacto["Nombre"]
            contacto["Teléfono"] = input(f"Nuevo teléfono ({contacto['Teléfono']}): ") or contacto["Teléfono"]
            nuevo_correo = input(f"Nuevo correo ({contacto['Correo']}): ") or contacto["Correo"]
            while not es_email_valido(nuevo_correo):
                print("❌ Correo inválido. Ingrese un email válido con '@'.")
                nuevo_correo = input("Nuevo correo: ")
            contacto["Correo"] = nuevo_correo
            contacto["Dirección"] = input(f"Nueva dirección ({contacto['Dirección']}): ") or contacto["Dirección"]
            contacto["Ciudad"] = input(f"Nueva ciudad ({contacto['Ciudad']}): ") or contacto["Ciudad"]
            print("✅ Contacto actualizado correctamente!")
            break
    else:
        print("❌ Contacto no encontrado.")
    input("Presiona Enter para continuar...")

def eliminar_contacto():
    """Elimina un contacto de la agenda."""
    limpiar_pantalla()
    ver_contactos()
    documento = input("Ingrese el documento del contacto a eliminar: ")
    for contacto in agenda:
        if contacto["Documento"] == documento:
            agenda.remove(contacto)
            print("✅ Contacto eliminado correctamente!")
            break
    else:
        print("❌ Contacto no encontrado.")
    input("Presiona Enter para continuar...")

def menu():
    """Muestra el menú principal del programa."""
    while True:
        limpiar_pantalla()
        print("📌 Agenda de Contactos - CRUD")
        print("1️⃣ Agregar Contacto")
        print("2️⃣ Ver Contactos")
        print("3️⃣ Actualizar Contacto")
        print("4️⃣ Eliminar Contacto")
        print("5️⃣ Salir")
        opcion = input("Seleccione una opción: ")
        if opcion == "1":
            crear_contacto()
        elif opcion == "2":
            ver_contactos()
        elif opcion == "3":
            actualizar_contacto()
        elif opcion == "4":
            eliminar_contacto()
        elif opcion == "5":
            print("👋 Saliendo del programa...")
            break
        else:
            print("❌ Opción inválida, intenta de nuevo.")
            input("Presiona Enter para continuar...")

# Ejecutar el programa
menu()
