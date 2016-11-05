function normalize(value) {
  return value ? value : "# TODO: OPS TO SET THIS VALUE"
}

function get_environment(env) {
    switch(env) {
      case "Production":
        env = "prod"
        break
      case "Staging":
        env = "stg"
        break
      case "Integration":
        env = "int"
        break
    }
    return env
}

function get_sdn_plugin(plugin) {
    switch(plugin) {
      case "Subnet":
        retval = "redhat/openshift-ovs-subnet"
        break
      case "Multitenant":
        retval = "redhat/openshift-ovs-multitenant"
        break
    }
    return retval
}

function generate_config() {
  config = "---\n"
  switch (g_cloud) {
    case "aws":
      config += "g_location: aws\n"
      config += "g_aws_ec2_region: " + normalize($('#aws_region').val()) + "\n"
      config += "g_aws_account: " + normalize($('#aws_account').val()) + "\n"
      config += "g_aws_account_id: " + normalize($('#aws_accountid').val()) + "\n"
      break

    case "gcp":
      config += "g_location: gcp\n"
      // TODO: add gcp data
      break
  }

  config += "g_environment: " + get_environment($('#environment').val()) + "\n"
  config += "g_install_version: " + $('#openshift_version').val() + "\n"

  config += "g_inventory_sdn: " + get_sdn_plugin($('#sdn_plugin').val()) + "\n"
  config += "g_cluster_sdn_plugin: " + get_sdn_plugin($('#sdn_plugin').val()) + "\n"

  switch (g_auth) {
    case "google":
      config += "g_authentication_identityproviders:\n"
      config += "  oauthConfig:\n"
      config += "    identityProviders:\n"
      config += "    - name: google\n"
      config += "      challenge: false\n"
      config += "      login: true\n"
      config += "      mappingMethod: claim\n"
      config += "      provider:\n"
      config += "        apiVersion: v1\n"
      config += "        kind: GoogleIdentityProvider\n"
      config += "        clientID: " + normalize($('#auth_google_client_id').val()) + "\n"
      config += "        clientSecret: " + normalize($('#auth_google_client_secret').val()) + "\n"
      config += "        hostedDomain: " + $('#auth_google_hosted_domain').val() + "\n"
      break

    case "github":
      config += "g_authentication_identityproviders:\n"
      config += "  oauthConfig:\n"
      config += "    identityProviders:\n"
      config += "    - name: github\n"
      config += "      challenge: false\n"
      config += "      login: true\n"
      config += "      mappingMethod: claim\n"
      config += "      provider:\n"
      config += "        apiVersion: v1\n"
      config += "        kind: GitHubIdentityProvider\n"
      config += "        clientID: " + normalize($('#auth_github_client_id').val()) + "\n"
      config += "        clientSecret: " + normalize($('#auth_github_client_secret').val()) + "\n"

/* TODO: add orgs for github
    organizations:
    - myorganization1
    - myorganization2
*/
      break
  }


  $('#cluster_config').text(config)
}

g_auth = "google"
function set_auth(val) {
  g_auth = val
}

g_cloud = "aws"
function set_cloud(val) {
  g_cloud = val
}
